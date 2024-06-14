import create from 'zustand';

const useAppStore = create((set) => ({
    sidebarCollapsed: false,
    toggleSidebar: () => set(state => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));

export default useAppStore;
