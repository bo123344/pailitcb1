import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [monthlyPailit, setMonthlyPailit] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showNightlyReport, setShowNightlyReport] = useState(false);
  const [dailyReport, setDailyReport] = useState(null);
  const [formData, setFormData] = useState({
    taskName: '',
    deadline: '09:00',
    nominal: 10000,
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('pailit_tasks');
    const savedMonthly = localStorage.getItem('pailit_monthly');
    const lastReportDate = localStorage.getItem('pailit_last_report_date');
    const today = new Date().toDateString();

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedMonthly) setMonthlyPailit(parseInt(savedMonthly));

    // Reset daily tracking on new day
    if (lastReportDate !== today) {
      localStorage.setItem('pailit_last_report_date', today);
    }
  }, []);

  // Save data to localStorage whenever tasks or monthly changes
  useEffect(() => {
    localStorage.setItem('pailit_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('pailit_monthly', monthlyPailit.toString());
  }, [monthlyPailit]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Check for deadline judgments every minute
  useEffect(() => {
    const checkDeadlines = () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      tasks.forEach((task) => {
        if (!task.judged && task.deadline === currentTime) {
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Pailit - Judgment Time! ⚖️', {
              body: `Apakah "${task.taskName}" sudah selesai? (Deadline: ${task.deadline})`,
              tag: `judgment-${task.id}`,
            });
          }
          // Mark as needing judgment
          setTasks((prevTasks) =>
            prevTasks.map((t) =>
              t.id === task.id ? { ...t, judging: true, judgeTime: now.getTime() } : t
            )
          );
        }

        // Auto-fail after 15 minutes of grace period
        if (task.judging && !task.judged) {
          const elapsed = now.getTime() - (task.judgeTime || 0);
          if (elapsed > 15 * 60 * 1000) {
            failTask(task.id);
          }
        }
      });
    };

    const interval = setInterval(checkDeadlines, 60000); // Check every minute
    checkDeadlines(); // Check immediately on mount
    return () => clearInterval(interval);
  }, [tasks]);

  // Check for nightly report at 21:00
  useEffect(() => {
    const checkNightlyReport = () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      if (currentTime === '21:00') {
        generateNightlyReport();
      }
    };

    const interval = setInterval(checkNightlyReport, 60000);
    return () => clearInterval(interval);
  }, [tasks, monthlyPailit]);

  const getDynamicNominal = (time) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 5 && hour < 12) return 10000; // Pagi
    if (hour >= 12 && hour < 18) return 5000; // Siang
    return 2000; // Sore/Malam
  };

  const getSarcasm = (balance) => {
    if (balance === 0) {
      return 'Tumben rajin. Pertahankan, jangan hangat-hangat tahi ayam.';
    } else if (balance > 0 && balance <= 15000) {
      return 'Mulai mager ya? Inget, miskin itu nyata, denda ini fiktif tapi kelakuan lu beneran males.';
    } else {
      return 'Minus banyak! Fix, dengan tingkat kemalasan kayak gini, cita-cita lu beli rumah cuma bakal jadi mimpi.';
    }
  };

  const addTask = () => {
    if (!formData.taskName || !formData.deadline) return;

    const newTask = {
      id: Date.now(),
      taskName: formData.taskName,
      deadline: formData.deadline,
      nominal: formData.nominal,
      status: 'pending',
      judging: false,
      judged: false,
      createdAt: new Date().toISOString(),
    };

    setTasks([...tasks, newTask]);
    setFormData({
      taskName: '',
      deadline: '09:00',
      nominal: getDynamicNominal('09:00'),
    });
    setShowModal(false);
  };

  const completeTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === id ? { ...t, status: 'completed', judged: true, judging: false } : t
      )
    );
  };

  const failTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (task && !task.judged) {
      setMonthlyPailit(monthlyPailit - task.nominal);
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === id ? { ...t, status: 'failed', judged: true, judging: false } : t
        )
      );
    }
  };

  const generateNightlyReport = () => {
    const todayTasks = tasks.filter(
      (t) => new Date(t.createdAt).toDateString() === new Date().toDateString()
    );
    const completed = todayTasks.filter((t) => t.status === 'completed').length;
    const failed = todayTasks.filter((t) => t.status === 'failed').length;
    const totalDenda = todayTasks
      .filter((t) => t.status === 'failed')
      .reduce((sum, t) => sum + t.nominal, 0);

    setDailyReport({
      completed,
      failed,
      totalDenda,
      total: todayTasks.length,
    });
    setShowNightlyReport(true);
  };

  const handleDeadlineChange = (e) => {
    const newDeadline = e.target.value;
    setFormData({
      ...formData,
      deadline: newDeadline,
      nominal: getDynamicNominal(newDeadline),
    });
  };

  const todaysTasks = tasks
    .filter((t) => new Date(t.createdAt).toDateString() === new Date().toDateString())
    .sort((a, b) => a.deadline.localeCompare(b.deadline));

  const balanceColor = monthlyPailit === 0 ? '#22c55e' : monthlyPailit > 0 ? '#ef4444' : '#ef4444';

  return (
    <div className="app">
      {/* Header with Balance */}
      <div className="header">
        <h1>Pailit 💸</h1>
        <div className="balance-banner" style={{ color: balanceColor }}>
          <div className="balance-label">Total Pailit Bulan Ini</div>
          <div className="balance-amount">Rp{Math.abs(monthlyPailit).toLocaleString('id-ID')}</div>
        </div>
        <div className="sarcasm-widget">{getSarcasm(monthlyPailit)}</div>
      </div>

      {/* Todays Tasks */}
      <div className="main-content">
        <h2>Today's To-Do List</h2>
        <div className="tasks-list">
          {todaysTasks.length === 0 ? (
            <p className="no-tasks">Belum ada tugas hari ini. Santai dulu? 😏</p>
          ) : (
            todaysTasks.map((task) => (
              <div key={task.id} className={`task-item status-${task.status}`}>
                <div className="task-header">
                  <div className="task-time">{task.deadline}</div>
                  <div className="task-name">{task.taskName}</div>
                  <div className="task-nominal">Rp{task.nominal.toLocaleString('id-ID')}</div>
                </div>

                {task.judging && !task.judged && (
                  <div className="judgment-actions">
                    <button
                      className="btn btn-complete"
                      onClick={() => completeTask(task.id)}
                    >
                      ✓ Kelar
                    </button>
                    <button
                      className="btn btn-fail"
                      onClick={() => failTask(task.id)}
                    >
                      ✗ Gagal
                    </button>
                  </div>
                )}

                {task.judged && (
                  <div className={`task-status ${task.status}`}>
                    {task.status === 'completed' ? '✓ Selesai' : '✗ Denda Diterima'}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Add Task Button */}
        <button className="btn btn-primary btn-add-task" onClick={() => setShowModal(true)}>
          + Tambah Tugas
        </button>
      </div>

      {/* Create Task Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Buat Tugas Baru</h2>
            <div className="form-group">
              <label>Nama Tugas</label>
              <input
                type="text"
                placeholder="Misal: Finish Project Report"
                value={formData.taskName}
                onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Deadline (Jam)</label>
              <input
                type="time"
                value={formData.deadline}
                onChange={handleDeadlineChange}
              />
            </div>

            <div className="form-group">
              <label>Nominal Denda</label>
              <input
                type="number"
                value={formData.nominal}
                onChange={(e) => setFormData({ ...formData, nominal: parseInt(e.target.value) })}
              />
            </div>

            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Batal
              </button>
              <button className="btn btn-primary" onClick={addTask}>
                Buat Tugas
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nightly Report Modal */}
      {showNightlyReport && dailyReport && (
        <div className="modal-overlay">
          <div className="modal nightly-report">
            <h2>📋 Rapor Dosa Malam Hari</h2>
            <div className="report-stats">
              <div className="stat">
                <div className="stat-label">Total Tugas</div>
                <div className="stat-value">{dailyReport.total}</div>
              </div>
              <div className="stat">
                <div className="stat-label">Selesai</div>
                <div className="stat-value green">{dailyReport.completed}</div>
              </div>
              <div className="stat">
                <div className="stat-label">Gagal</div>
                <div className="stat-value red">{dailyReport.failed}</div>
              </div>
            </div>
            <div className="total-denda">
              Total Denda Hari Ini: <span className="amount">Rp{dailyReport.totalDenda.toLocaleString('id-ID')}</span>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowNightlyReport(false)}>
                Tutup
              </button>
              <button className="btn btn-primary" onClick={() => {
                const text = `Rapor Dosa Pailit:\nTotal: ${dailyReport.total} | Selesai: ${dailyReport.completed} | Gagal: ${dailyReport.failed}\nTotal Denda: Rp${dailyReport.totalDenda.toLocaleString('id-ID')}`;
                navigator.clipboard.writeText(text);
                alert('Copied to clipboard!');
              }}>
                📤 Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Nightly Report Button */}
      <div className="footer">
        <button className="btn btn-secondary" onClick={generateNightlyReport}>
          📋 Buka Rapor Malam Ini
        </button>
      </div>
    </div>
  );
};

export default App;
