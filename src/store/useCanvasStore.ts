import { create } from 'zustand';
import type { MetricKey } from '../types/cloud';

interface CanvasState {
  selectedAppId: string;
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  activeInspectorTab: MetricKey;
  appPanelOpen: boolean;
  mobileInspectorOpen: boolean;
  graphErrorSimulated: boolean;
  setSelectedAppId: (id: string) => void;
  setSelectedNodeId: (id: string | null) => void;
  setSelectedEdgeId: (id: string | null) => void;
  setActiveInspectorTab: (tab: MetricKey) => void;
  setAppPanelOpen: (open: boolean) => void;
  toggleAppPanel: () => void;
  setMobileInspectorOpen: (open: boolean) => void;
  toggleGraphError: () => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  selectedAppId: 'golang',
  selectedNodeId: 'postgres',
  selectedEdgeId: null,
  activeInspectorTab: 'cpu',
  appPanelOpen: true,
  mobileInspectorOpen: false,
  graphErrorSimulated: false,
  setSelectedAppId: (id) => set({ selectedAppId: id, appPanelOpen: false }),
  setSelectedNodeId: (id) =>
    set({
      selectedNodeId: id,
      selectedEdgeId: null,
      mobileInspectorOpen: Boolean(id),
    }),
  setSelectedEdgeId: (id) => set({ selectedEdgeId: id, selectedNodeId: null }),
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
  setAppPanelOpen: (open) => set({ appPanelOpen: open }),
  toggleAppPanel: () => set((state) => ({ appPanelOpen: !state.appPanelOpen })),
  setMobileInspectorOpen: (open) => set({ mobileInspectorOpen: open }),
  toggleGraphError: () => set((state) => ({ graphErrorSimulated: !state.graphErrorSimulated })),
}));
