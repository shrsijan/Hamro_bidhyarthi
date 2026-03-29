import { useEffect, useState } from "react";
import { getStudents, getBuddy, getCreativeTask } from "../api";
import { Users, Sparkles, Loader2, ChevronRight, ArrowLeft } from "lucide-react";

export default function BuddyTasks() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buddyPairs, setBuddyPairs] = useState([]);
  const [selectedPair, setSelectedPair] = useState(null);
  const [task, setTask] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getStudents()
      .then((list) => {
        setStudents(list);
        loadBuddyPairs(list);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function loadBuddyPairs(studentList) {
    const pairs = [];
    const seen = new Set();

    for (const s of studentList) {
      if (seen.has(s.id)) continue;
      try {
        const info = await getBuddy(s.id);
        if (info?.buddy && !seen.has(info.buddy.id)) {
          pairs.push({ student: s, buddy: info.buddy });
          seen.add(s.id);
          seen.add(info.buddy.id);
        }
      } catch {
        // no buddy assigned
      }
    }
    setBuddyPairs(pairs);
  }

  async function generateTask(studentId) {
    setError("");
    setGenerating(true);
    setTask(null);
    try {
      const result = await getCreativeTask(studentId);
      setTask(result);
    } catch (err) {
      setError(err.message || "Failed to generate task");
    } finally {
      setGenerating(false);
    }
  }

  function handleSelectPair(pair) {
    setSelectedPair(pair);
    setTask(null);
    setError("");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-sm text-gray-400">Loading students...</p>
      </div>
    );
  }

  if (selectedPair) {
    const { student, buddy } = selectedPair;
    return (
      <div>
        <button
          onClick={() => { setSelectedPair(null); setTask(null); }}
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to buddy list
        </button>

        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
          <h2 className="text-sm font-medium text-gray-900 mb-4">Buddy Pair</h2>
          <div className="flex items-center gap-4">
            <PairCard name={student.name} className={student.class} />
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 shrink-0">
              <Users size={14} className="text-gray-400" />
            </div>
            <PairCard name={buddy.name} className={buddy.class} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-900">Creative Task</h2>
            <button
              onClick={() => generateTask(student.id)}
              disabled={generating}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              {generating ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Sparkles size={14} />
              )}
              {generating ? "Generating..." : "Generate Task"}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg mb-4">{error}</p>
          )}

          {task ? (
            <div className="space-y-4">
              {task.category && (
                <span className="inline-block px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full capitalize">
                  {task.category}
                </span>
              )}

              {task.task_en && (
                <p className="text-sm text-gray-900 leading-relaxed font-medium">
                  {task.task_en}
                </p>
              )}

              {task.task_np && (
                <p className="text-sm text-gray-600 leading-relaxed">
                  {task.task_np}
                </p>
              )}

              {task.why_this_pair && (
                <div className="bg-gray-50 rounded-lg px-4 py-3">
                  <p className="text-xs font-medium text-gray-400 mb-1">Why this pair</p>
                  <p className="text-sm text-gray-700">{task.why_this_pair}</p>
                </div>
              )}

              {task.materials_needed?.length > 0 && (
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-400 mb-2">Materials Needed</p>
                  <div className="flex flex-wrap gap-1.5">
                    {task.materials_needed.map((m, i) => (
                      <span key={i} className="px-2.5 py-1 text-xs bg-gray-50 text-gray-600 rounded-full border border-gray-100">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {task.bonus_challenge && (
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-400 mb-1">Bonus Challenge</p>
                  <p className="text-sm text-gray-700">{task.bonus_challenge}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              Generate an AI-powered creative task tailored to this buddy pair's interests, age, and class.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-900">Buddy Tasks</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Select a buddy pair to generate a collaborative creative task
        </p>
      </div>

      {buddyPairs.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <Users size={24} className="text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-400">
            {loading ? "Loading buddy pairs..." : "No buddy pairs found for your students"}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {buddyPairs.map((pair, i) => (
            <button
              key={i}
              onClick={() => handleSelectPair(pair)}
              className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-gray-300 hover:bg-gray-50 transition-colors text-left group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Users size={14} className="text-gray-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {pair.student.name} & {pair.buddy.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    Class {pair.student.class}
                  </p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PairCard({ name, className }) {
  return (
    <div className="flex-1 bg-gray-50 rounded-lg px-4 py-3 text-center">
      <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
      <p className="text-xs text-gray-400">Class {className}</p>
    </div>
  );
}
