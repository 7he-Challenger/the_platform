import React from 'react';
import { useAppSelector } from '~store/hooks';
import { selectTreatementLoading } from '~store/loading-overlay/selector';

const LoadingOverlay = () => {
  const loading = useAppSelector(selectTreatementLoading)

  return loading && (
    <div className="body-loader">
      <div className="loader">
        <p className="loader_txt">Loading...</p>
        <div className="loader_arc"></div>
        <div className="loader_rnd_container">
            <div className="loader_rnd"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingOverlay