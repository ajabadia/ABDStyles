// Hook for live polling of audit logs
import { useState, useEffect, useRef, useCallback } from 'react';
export function useLivePolling({ tenantId, pollInterval = 5000 }) {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newLogIds, setNewLogIds] = useState(new Set());
    const [isLive, setIsLive] = useState(true);
    const [lastFetched, setLastFetched] = useState(null);
    const knownIdsRef = useRef(new Set());
    const isLiveRef = useRef(isLive);
    useEffect(() => {
        isLiveRef.current = isLive;
    }, [isLive]);
    const fetchLogs = useCallback(async (isInitial = false) => {
        try {
            if (isInitial)
                setLoading(true);
            const res = await fetch(`/api/admin/audit?tenantId=${tenantId}&limit=50`, {
                cache: 'no-store',
            });
            if (!res.ok)
                throw new Error('Failed to fetch logs');
            const data = await res.json();
            if (!isInitial && knownIdsRef.current.size > 0) {
                const incoming = new Set();
                data.forEach((log) => {
                    if (log._id && !knownIdsRef.current.has(log._id)) {
                        incoming.add(log._id);
                    }
                });
                if (incoming.size > 0) {
                    setNewLogIds((prev) => new Set([...prev, ...incoming]));
                    setTimeout(() => {
                        setNewLogIds((prev) => {
                            const next = new Set(prev);
                            incoming.forEach((id) => next.delete(id));
                            return next;
                        });
                    }, 2500);
                }
            }
            knownIdsRef.current = new Set(data.map((l) => l._id).filter(Boolean));
            setLogs(data);
            setLastFetched(new Date());
        }
        catch (err) {
            console.error(err);
        }
        finally {
            if (isInitial)
                setLoading(false);
        }
    }, [tenantId]);
    // initial load
    useEffect(() => {
        fetchLogs(true);
    }, [fetchLogs]);
    // polling
    useEffect(() => {
        if (!isLive)
            return;
        const interval = setInterval(() => {
            if (isLiveRef.current)
                fetchLogs(false);
        }, pollInterval);
        return () => clearInterval(interval);
    }, [isLive, pollInterval, fetchLogs]);
    const toggleLive = () => setIsLive((prev) => !prev);
    return { logs, loading, newLogIds, isLive, toggleLive, lastFetched };
}
//# sourceMappingURL=useLivePolling.js.map