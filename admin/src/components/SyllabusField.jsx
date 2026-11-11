import { FiPlus, FiTrash2 } from "react-icons/fi";

// Editable list of syllabus modules, each with a name and a topics list.
export default function SyllabusField({ value, onChange }) {
  const modules = Array.isArray(value) ? value : [];

  const updateModule = (index, patch) => {
    const next = modules.map((item, i) => (i === index ? { ...item, ...patch } : item));
    onChange(next);
  };

  const addModule = () => {
    onChange([...modules, { module: "", topics: [] }]);
  };

  const removeModule = (index) => {
    onChange(modules.filter((_, i) => i !== index));
  };

  return (
    <div className="field">
      <div className="field-label-row">
        <label className="field-label">Syllabus</label>
        <button type="button" className="btn btn-secondary btn-sm" onClick={addModule}>
          <FiPlus /> Add module
        </button>
      </div>

      {modules.length === 0 ? (
        <p className="field-hint">No modules yet. Add your first module above.</p>
      ) : (
        <div className="syllabus-list">
          {modules.map((item, index) => (
            <div className="syllabus-item" key={index}>
              <div className="syllabus-item-head">
                <span className="syllabus-index">Module {index + 1}</span>
                <button
                  type="button"
                  className="btn btn-ghost btn-icon btn-danger-text"
                  title="Remove module"
                  onClick={() => removeModule(index)}
                >
                  <FiTrash2 />
                </button>
              </div>
              <input
                type="text"
                className="input"
                placeholder="Module name"
                value={item.module || ""}
                onChange={(event) => updateModule(index, { module: event.target.value })}
              />
              <textarea
                className="input textarea"
                rows={4}
                placeholder="One topic per line"
                value={Array.isArray(item.topics) ? item.topics.join("\n") : ""}
                onChange={(event) =>
                  updateModule(index, {
                    topics: event.target.value
                      .split("\n")
                      .map((line) => line.trim())
                      .filter((line) => line.length > 0),
                  })
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
