import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DelayChart = () => {
  const data = [
    { hour: '00:00', delay: 15 },
    { hour: '02:00', delay: 12 },
    { hour: '04:00', delay: 8 },
    { hour: '06:00', delay: 18 },
    { hour: '08:00', delay: 32 },
    { hour: '10:00', delay: 28 },
    { hour: '12:00', delay: 35 },
    { hour: '14:00', delay: 42 },
    { hour: '16:00', delay: 48 },
    { hour: '18:00', delay: 38 },
    { hour: '20:00', delay: 26 },
    { hour: '22:00', delay: 19 },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
        <XAxis 
          dataKey="hour" 
          tick={{ fontSize: 12 }}
          stroke="hsl(var(--muted-foreground))"
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          stroke="hsl(var(--muted-foreground))"
          label={{ value: 'Minutes', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="delay" 
          stroke="hsl(var(--primary))" 
          strokeWidth={2}
          dot={{ fill: 'hsl(var(--primary))', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DelayChart;
