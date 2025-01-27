import React, { useState, useEffect } from 'react';

import { Image } from 'antd';
import { AllowedImageTypes, AllowedOfficeTypes } from '@/app/utils/constant';
import { IChatMessageHistoryList } from '@/app/types/groupChat';

export const useMessageEl = (item: IChatMessageHistoryList) => {
  const [displayContent, setDisplayContent] = useState<any>(null);

  useEffect(() => {
    if (item.fileType == null) {
      setDisplayContent(item.postMessage);
    } else if (AllowedImageTypes.includes(item.fileType)) {
      setDisplayContent(<Image width={200} src={item.postMessage} />);
    } else if (AllowedOfficeTypes.includes(item.fileType)) {
      if (item.fileType === 'xls' || item.fileType === 'xlsx') {
        setDisplayContent(
          <div className="flex justify-between">
            <div className="mr-3">
              <div className="w-36">{item.originalFileName}</div>
              <div>{item.fileSize}</div>
            </div>
            <img alt="SVG Image" src="/images/filesIcon/xls.svg" width="37" height="37"></img>
          </div>,
        );
      }

      if (item.fileType === 'ppt' || item.fileType === 'pptx') {
        setDisplayContent(
          <div className="flex justify-between">
            <div className="mr-3">
              <div className="w-36">{item.originalFileName}</div>
              <div>{item.fileSize}</div>
            </div>
            <img alt="SVG Image" src="/images/filesIcon/ppt.svg" width="37" height="37"></img>
          </div>,
        );
      }

      if (item.fileType === 'pdf') {
        setDisplayContent(
          <div className="flex justify-between">
            <div className="mr-3">
              <div className="w-36">{item.originalFileName}</div>
              <div>{item.fileSize}</div>
            </div>
            <img alt="SVG Image" src="/images/filesIcon/pdf.svg" width="37" height="37"></img>
          </div>,
        );
      }
    }
  }, [item]);

  return displayContent;
};
