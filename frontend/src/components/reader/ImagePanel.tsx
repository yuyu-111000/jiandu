import { useState } from 'react'
import PanelToolbar from '../common/PanelToolbar'
import ImageViewer from './ImageViewer'

interface Props {
  pageNumber: number
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
}

export default function ImagePanel({ pageNumber, onPrev, onNext, hasPrev, hasNext }: Props) {
  const [zoom, setZoom] = useState(100)

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, gap: 12 }}>
        <h4 style={{ margin: 0, fontSize: 15 }}>原图 / 页码 {pageNumber}</h4>
        <PanelToolbar
          tools={[
            { label: '上一页', onClick: onPrev },
            { label: '下一页', onClick: onNext },
            {
              label: `${zoom}%`,
              onClick: () => setZoom(z => (z >= 200 ? 50 : z + 25)),
            },
          ]}
        />
      </div>
      <ImageViewer pageNumber={pageNumber} zoom={zoom} />
    </>
  )
}
