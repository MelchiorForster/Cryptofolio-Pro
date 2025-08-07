import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TrendingUp, Wallet, BarChart3, PieChart } from 'lucide-react'

const Navbar = () => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: BarChart3 },
    { path: '/portfolio', label: 'Portfolio', icon: Wallet },
    { path: '/markets', label: 'Markets', icon: TrendingUp },
    { path: '/analytics', label: 'Analytics', icon: PieChart },
  ]

  return (
    <nav className="bg-crypto-card border-b border-crypto-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-crypto-accent rounded-lg flex items-center justify-center">
              <span className="text-crypto-dark font-bold text-lg">₿</span>
            </div>
            <span className="text-xl font-bold text-white">CryptoFolio Pro</span>
          </div>
          
          {/* Navigation Links */}
          <div className="flex space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'text-crypto-accent bg-crypto-accent/10'
                    : 'text-gray-300 hover:text-white hover:bg-crypto-border/50'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </div>
          
          {/* User Area */}
          <div className="flex items-center space-x-4">
            <button className="btn-primary">
              Konto verwalten
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
