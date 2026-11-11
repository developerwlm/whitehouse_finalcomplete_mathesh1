import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";

// Shows a success message passed through router navigation state.
export default function Flash() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(false);

  const message = location.state && location.state.flash;
  if (!message || dismissed) return null;

  const close = () => {
    setDismissed(true);
    // Clear the flash from history so it does not reappear.
    navigate(location.pathname, { replace: true, state: null });
  };

  return (
    <div className="alert alert-success">
      <span>{message}</span>
      <button type="button" className="alert-close" onClick={close} aria-label="Dismiss">
        <FiX />
      </button>
    </div>
  );
}
