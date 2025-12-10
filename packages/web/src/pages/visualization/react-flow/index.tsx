import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { Sidebar } from './components/Sidebar';
import { FlowCanvas } from './components/FlowCanvas';

import '@xyflow/react/dist/style.css';

export const Component = () => {
  return (
    <ReactFlowProvider>
      <div style={{ display: 'flex', width: '100%', height: 'calc(100vh - 100px)' }}>
        <Sidebar />
        <FlowCanvas />
      </div>
    </ReactFlowProvider>
  );
};
