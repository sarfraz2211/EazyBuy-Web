import React from "react";

interface AuthContainerProps {
title: string;
subtitle: string;
children: React.ReactNode;
}

export default function AuthContainer({
title,
subtitle,
children,
}:AuthContainerProps) {
    return (

       <div className="auth-main-container">

         <div className="auth-card">

            {/* App Logo */}
        
        <div 
                className="logo-container">
                <span className="logo-icon">🛍️</span>
                 <h1 className="logo-text">EazyBuy</h1> 
                </div>

        {/* Heading */} 
        <h2 className="auth-title">{title}</h2>

        {/* Subtitle */} 
        <p className="auth-subtitle">{subtitle}</p>

        {/* Dynamic Form Content */} 
        <div className="auth-content">{children}</div>
         </div> 
         </div>

    );
}