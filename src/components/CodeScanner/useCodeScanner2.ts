import {useState, useEffect, useRef, useCallback} from "react"
import {UseCodeScannerOptions, UseCodeScannerReturn} from "./types"
import {Readers} from "@ericblade/quagga2"
import BarcodeReader = Readers.BarcodeReader

const SELECTED_CAMERA_KEY = "selectedCameraDeviceId2"

const useCodeScanner = (
  options: UseCodeScannerOptions = {}
): UseCodeScannerReturn => {
  const scannerRef = useRef<HTMLVideoElement | null>(null)
  const [scannedCode, setScannedCode] = useState("")
  const [error, setError] = useState<Error | null>(null)
  const [isScanning, setIsScanning] = useState(true)
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([])
  const [selectedCamera, setSelectedCamera] = useState<string>("")
  const [torchOn, setTorchOn] = useState(false)

  const barcodeDetector = useRef<BarcodeDetector | null>(null)
  const mediaStream = useRef<MediaStream | null>(null)

  const startScanning = useCallback(async () => {
    if (!scannerRef.current) return

    try {
      barcodeDetector.current = new BarcodeDetector({formats: ["code_128"]})

      navigator.mediaDevices
        .getUserMedia({video: true})
        .then((stream) => {
          const videoElement = document.createElement("video")
          videoElement.srcObject = stream
          videoElement.playsInline = true
          videoElement.muted = true
          videoElement.play().catch((error) => {
            throw new Error("Error playing video:", error)
          })

          const drawFrame = () => {
            const canvas = scannerRef.current?.querySelector("canvas")
            const context = canvas?.getContext("2d")
            if (canvas && context) {
              context.drawImage(videoElement, 0, 0, canvas.width, canvas.height)
            }
            requestAnimationFrame(drawFrame)
          }

          drawFrame()

          const detectBarcode = async () => {
            if (!scannerRef.current || !barcodeDetector.current) return

            const track = stream.getVideoTracks()[0]
            if (!track) return

            const imageCapture = new ImageCapture(track)
            const bitmap = await imageCapture.grabFrame()

            const barcodes = await barcodeDetector.current.detect(bitmap)
            if (barcodes.length > 0) {
              const code = barcodes[0].rawValue || ""
              setScannedCode(code)
              options?.onScan?.({
                code,
                raw: barcodes[0],
                timestamp: Date.now(),
              })
            }

            if (isScanning) {
              requestAnimationFrame(detectBarcode)
            }
          }

          requestAnimationFrame(detectBarcode)

        })
        .catch((err) => {
          throw new Error("Error accessing camera:", err)
        })

    } catch (err) {
      setError(err as Error)
      options?.onError?.(err as Error)
    }
  }, [selectedCamera, isScanning, options])

  useEffect(() => {
    if (typeof BarcodeReader === "undefined" || !navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      const err = new Error("Camera access is not supported on this device.")
      setError(err)
      options?.onError?.(err as Error)
      return
    }

    navigator.mediaDevices.getUserMedia({video: true})
      .then(() => {
        navigator.mediaDevices
          .enumerateDevices()
          .then((devices) => {
            const videoDevices = devices.filter((device) => device.kind === "videoinput")
            setCameras(videoDevices)

            const savedCameraId = localStorage.getItem(SELECTED_CAMERA_KEY)
            const defaultCamera = videoDevices.find((d) =>
              d.label.toLowerCase().includes("back")
            )?.deviceId

            const camera = savedCameraId || defaultCamera || videoDevices[0]?.deviceId
            if (!camera) {
              const err = new Error("Camera not found")
              setError(err)
              options?.onError?.(err as Error)
              return
            }
            setSelectedCamera(camera)
          })
          .catch((err) => {
            setError(err)
            options.onError?.(err)
          })
      })
  }, [])

  useEffect(() => {
    if (selectedCamera) {
      startScanning().then()
    }

    return () => {
      if (mediaStream.current) {
        mediaStream.current.getTracks().forEach((track) => track.stop())
        mediaStream.current = null
      }
    }
  }, [selectedCamera])


  const toggleTorch = useCallback(() => {
    if (mediaStream.current) {
      const track = mediaStream.current.getVideoTracks()[0]
      const capabilities = track.getCapabilities()
      if (capabilities.torch) {
        const torchEnabled = torchOn
        track.applyConstraints({
          advanced: [{torch: !torchEnabled}],
        }).then()
        setTorchOn(!torchEnabled)
      }
    }
  }, [torchOn])

  const switchCamera = (deviceId: string) => {
    setSelectedCamera(deviceId)
    localStorage.setItem(SELECTED_CAMERA_KEY, deviceId)
  }

  return {
    scannerRef,
    scannedCode,
    error,
    isScanning,
    toggleScanning: () => setIsScanning((prev) => !prev),
    cameras,
    selectedCamera,
    switchCamera,
    torchOn,
    toggleTorch,
  }
}

export default useCodeScanner
