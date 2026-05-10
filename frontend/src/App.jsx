import { useEffect, useState } from "react"
import axios from "axios"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const App = () => {

  const [backendMessage, setBackendMessage] = useState("Loading backend...")
  const [positiveScore, setPositiveScore] = useState(0)
  const [neutralScore, setNeutralScore] = useState(0)
  const [negativeScore, setNegativeScore] = useState(0)
  const [searchText, setSearchText] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {

  axios.get("http://127.0.0.1:5000/")
    .then((response) => {
      setBackendMessage(response.data.message)
    })
 

}, [])

const analyzeSentiment = () => {
  setLoading(true)

  axios.post("https://pulsetrack-backend-q23e.onrender.com/sentiment", {
    text: searchText
  })

  .then((response) => {

    console.log(response.data)

    setPositiveScore(
      (response.data.sentiment.pos * 100).toFixed(0)
    )

    setNeutralScore(
      (response.data.sentiment.neu * 100).toFixed(0)
    )

    setNegativeScore(
      (response.data.sentiment.neg * 100).toFixed(0)
    )
    setLoading(false)

  })

  .catch((error) => {
  console.log(error)
  setLoading(false)
})

}

  const chartData = {
  labels: ["Positive", "Neutral", "Negative"],

  datasets: [
    {
      label: "Sentiment Analysis",

      data: [
        positiveScore,
        neutralScore,
        negativeScore
      ],

      borderColor: "#06b6d4",
      backgroundColor: "#06b6d4",

      tension: 0.4,
    },
  ],
}

  const chartOptions = {
    responsive: true,

    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },

      y: {
        ticks: {
          color: "white",
        },
      },
    },
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">

        <h1 className="text-2xl font-bold text-cyan-400">
          PulseTrack
        </h1>

        <button className="bg-cyan-500 px-5 py-2 rounded-xl">
          Live Analytics
        </button>

      </nav>

      {/* Hero */}
      <div className="px-8 pt-16">

        <h1 className="text-5xl font-extrabold max-w-4xl leading-tight">
          Real-Time Social Media Analytics Dashboard
        </h1>

        <p className="text-slate-400 text-lg max-w-2xl mt-6">
          Analyze trends, monitor engagement, and track sentiment using AI-powered insights.
        </p>

      </div>

      {/* Backend Status */}
      <div className="px-8 mt-8">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-xl font-bold mb-3 text-cyan-400">
            Backend Status
          </h2>

          <p className="text-slate-300">
            {backendMessage}
          </p>

        </div>

      </div>

      {/* Search */}
      <div className="px-8 mt-8">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">

          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search keyword, hashtag, or topic..."
            className="bg-transparent outline-none w-full text-white"
          />

          <button 
          onClick={analyzeSentiment}
          className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-xl transition">
            {loading ? "Analyzing..." : "Search"}
          </button>

        </div>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 mt-12">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-slate-400">
            Total Mentions
          </h2>

          <p className="text-4xl font-bold mt-4 text-cyan-400">
            12.4K
          </p>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-slate-400">
            Positive Sentiment
          </h2>

          <p className="text-4xl font-bold mt-4 text-green-400">
            {positiveScore}%
          </p>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-slate-400">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

  <h2 className="text-slate-400">
    Neutral Sentiment
  </h2>

  <p className="text-4xl font-bold mt-4 text-yellow-400">
    {neutralScore}%
  </p>

</div>
<div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

  <h2 className="text-slate-400">
    Negative Sentiment
  </h2>

  <p className="text-4xl font-bold mt-4 text-red-400">
    {negativeScore}%
  </p>

</div>
          </h2>

          <p className="text-4xl font-bold mt-4 text-pink-400">
            92
          </p>

        </div>

      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-8 mt-12 pb-12">

        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Engagement Analytics
          </h2>

          <Line data={chartData} options={chartOptions} />

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Trending Topics
          </h2>

          <div className="space-y-4">

            <div className="bg-slate-800 p-4 rounded-xl">
              #AI
            </div>

            <div className="bg-slate-800 p-4 rounded-xl">
              #TechNews
            </div>

            <div className="bg-slate-800 p-4 rounded-xl">
              #Climate
            </div>

            <div className="bg-slate-800 p-4 rounded-xl">
              #Startups
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default App