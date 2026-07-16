import { useEffect, useState } from "react";
import {
    Activity,
    CloudCog,
    DollarSign,
    TriangleAlert,
} from "lucide-react";
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
} from "recharts";

import { api } from "../lib/api";
import { StatCard } from "../components/StatCard";

const chart = [
    { n: "Mon", v: 31 },
    { n: "Tue", v: 42 },
    { n: "Wed", v: 37 },
    { n: "Thu", v: 54 },
    { n: "Fri", v: 48 },
    { n: "Sat", v: 62 },
    { n: "Sun", v: 58 },
];

export function Overview() {
    const [s, setS] = useState({
        services: 0,
        healthy: 0,
        warnings: 0,
        costEstimate: 0,
    });

    useEffect(() => {
        api<typeof s>("/aws/summary").then(setS);
    }, []);

    return (
        <>
            <header>
                <p className="text-sm text-orange-400">
                    AWS Organization
                </p>

                <h1 className="mt-1 text-3xl font-bold">
                    Infrastructure overview
                </h1>

                <p className="mt-2 text-slate-400">
                    Monitor services, access and operational health.
                </p>
            </header>

            <section className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Services"
                    value={s.services}
                    detail="Across ap-south-1"
                    icon={CloudCog}
                />

                <StatCard
                    label="Healthy resources"
                    value={s.healthy}
                    detail="Last checked now"
                    icon={Activity}
                />

                <StatCard
                    label="Warnings"
                    value={s.warnings}
                    detail="Needs attention"
                    icon={TriangleAlert}
                />

                <StatCard
                    label="Monthly estimate"
                    value={`$${s.costEstimate}`}
                    detail="Mock billing estimate"
                    icon={DollarSign}
                />
            </section>

            <section className="mt-6 grid gap-5 xl:grid-cols-[2fr_1fr]">
                <div className="glass rounded-2xl p-5">
                    <h2 className="font-semibold">
                        Requests this week
                    </h2>

                    <div className="mt-5 h-72">
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
                            <AreaChart data={chart}>
                                <defs>
                                    <linearGradient
                                        id="g"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#ff9900"
                                            stopOpacity={0.45}
                                        />

                                        <stop
                                            offset="95%"
                                            stopColor="#ff9900"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>

                                <XAxis
                                    dataKey="n"
                                    stroke="#64748b"
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <Tooltip
                                    contentStyle={{
                                        background: "#111827",
                                        border: "1px solid #334155",
                                    }}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="v"
                                    stroke="#ff9900"
                                    fill="url(#g)"
                                    strokeWidth={3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass rounded-2xl p-5">
                    <h2 className="font-semibold">
                        Environment
                    </h2>

                    {[
                        ["Production", "Healthy"],
                        ["Staging", "Healthy"],
                        ["Development", "Warning"],
                    ].map(([a, b]) => (
                        <div
                            key={a}
                            className="mt-4 flex items-center justify-between rounded-xl bg-slate-900/70 p-4"
                        >
                            <span>{a}</span>

                            <span
                                className={
                                    b === "Healthy"
                                        ? "text-emerald-400"
                                        : "text-amber-400"
                                }
                            >
                                {b}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}