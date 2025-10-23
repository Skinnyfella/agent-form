"use client"

import { useState } from "react"
import emailjs from '@emailjs/browser'

const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
]

export default function AgencyForm() {
  const [formData, setFormData] = useState({
    id: "",
    agencyName: "",
    mobileNumber: "",
    country: "",
    otp: "",
  })
  const [otpSent, setOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [generatedOtp, setGeneratedOtp] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      country: e.target.value,
    }))
  }

  const handleGetOTP = () => {
    if (!formData.mobileNumber.trim() || !formData.agencyName.trim()) {
      setError("Please enter both agency name and mobile number")
      return
    }
    setIsLoading(true)
    setError("")
    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    // EmailJS configuration using environment variables
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;
    // Prepare the email template parameters (must match template variables)
    const templateParams = {
      email: 'officialayanfedavid@gmail.com',
      id: formData.id,
      agencyName: formData.agencyName,
      country: formData.country,
      mobileNumber: formData.mobileNumber,
      otp,
      message: `ID: ${formData.id}\nAgency Name: ${formData.agencyName}\nCountry: ${formData.country}\nMobile Number: ${formData.mobileNumber}\nOTP: ${otp}`
    };
    // Send the email
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setOtpSent(true)
        console.log("Email notification sent successfully")
        console.log("OTP generated and sent:", otp)
      })
      .catch((err: Error) => {
        console.error("Failed to send email notification:", err)
        setError("Failed to send OTP. Please try again.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.otp !== generatedOtp) {
      setError("Incorrect OTP. Please enter the code sent to your email.");
      return;
    }
    setError("");
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold text-green-500">Apply For Agency</h1>
      </div>

      {/* Illustration Section */}
      <div className="mb-8 flex justify-center">
        <img
          src="/business-agency-illustration-with-people-and-docum.jpg"
          alt="Agency illustration"
          className="w-full h-auto rounded-lg"
        />
      </div>

      {/* Header Section */}
      <div className="text-center mb-8">
        <p className="text-sm text-gray-600">Describe your agent information</p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ID Field */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">ID</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🆔</span>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              placeholder="Enter your id"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>
        </div>
        {/* Agency Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Agency Name</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🏢</span>
            <input
              type="text"
              name="agencyName"
              value={formData.agencyName}
              onChange={handleInputChange}
              placeholder="Enter agency name"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Mobile Number Field with OTP Button */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Mobile Number</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📱</span>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                placeholder="Enter mobile number"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>
            <button
              type="button"
              onClick={handleGetOTP}
              disabled={isLoading}
              className={`px-4 py-3 bg-green-500 text-white font-semibold rounded-lg transition ${
                isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-600"
              }`}
            >
              {isLoading ? "Sending..." : "Get OTP"}
            </button>
          </div>
        </div>

        {/* Country Dropdown */}
        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-gray-600">Country</label>
            <span className="text-xs text-red-500 ml-2 whitespace-nowrap">* Not to be alter once set</span>
          </div>
          <div className="relative flex items-center gap-2">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🌍</span>
            <select
              name="country"
              value={formData.country}
              onChange={handleCountryChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition appearance-none bg-white"
            >
              <option value="" disabled>Select your country</option>
              {COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▼</span>
          </div>
        </div>

        {/* Error message */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* OTP Input Field (shown only after OTP is sent) */}
        {otpSent && (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">OTP Verification</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="Enter OTP code"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
