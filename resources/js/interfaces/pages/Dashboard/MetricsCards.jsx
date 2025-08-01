// components/MetricsCards.jsx
export default function MetricsCards({ metrics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition"
          style={{ borderLeft: `4px solid ${metric.color}` }}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-500 font-medium mb-1">{metric.title}</h3>
              <p className="text-2xl font-bold">{metric.value}</p>
              <div className={`mt-2 text-sm font-medium ${metric.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {metric.change} <span className="ml-1">since last month</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: metric.bgColor }}>
              <i className={`${metric.icon} text-xl`} style={{ color: metric.color }}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
