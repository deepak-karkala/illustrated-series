interface DrawerToggleProps {
  onClick: () => void;
}

export function DrawerToggle({ onClick }: DrawerToggleProps) {
  return (
    <button className="drawer-toggle-btn" onClick={onClick} aria-label="Open state inspector">
      <span className="drawer-toggle-icon">▸</span>
      <span className="drawer-toggle-label">Inspect state</span>
    </button>
  );
}
