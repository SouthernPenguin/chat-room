import React from 'react';

const CharRoom = () => {
  return (
    <div className="flex h-full">
      <div className="bg-cyan-300 w-72 flex-none">侧边</div>
      <div className="flex-auto flex">
        <div className="bg-slate-400 w-full transition-all text-right">内容区域</div>
        <div className="bg-slate-800 w-60" style={{ display: 'none' }}>
          详细信息
        </div>
      </div>
    </div>
  );
};

export default CharRoom;
