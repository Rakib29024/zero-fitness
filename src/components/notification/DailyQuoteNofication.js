import React, { useEffect, useState } from 'react';

const config = {
    quotesApiUrl: 'https://type.fit/api/quotes',
}
  
const DailyQuoteNotification = () => {
  const [quote, setQuote] = useState('')

  useEffect(() => {
    const getQuote = async () => {
        fetch(config.quotesApiUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data && data.length > 0) {
              const randomIndex = Math.floor(Math.random() * data.length)
              const randomQuote = data[randomIndex]
              randomQuote.author = randomQuote.author.replace(', type.fit', '')
              console.log(randomQuote.text)
              setQuote(randomQuote.text)
            }
          })
          .catch((error) => {
            console.error('Error fetching quote:', error.message)
        })
    }

    const showNotification = async () => {
        await getQuote()
        if (!('Notification' in window)) {
          console.log('This browser does not support desktop notification');
        } else {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              const notification = new Notification('Today\'s Quote from Zero Fitness', {
                body: quote,
                icon: '/static/media/logo.63fd68bfce01b503da54.png' // Optional icon for the notification
              });
            } else {
              console.log('Notification permission denied');
            }
          });
        }
      };  

    getQuote()

    // Schedule the notification to repeat every 5 minutes
    const intervalId = setInterval(showNotification, 5 * 60 * 1000);
    return () => clearInterval(intervalId);

  }, []);

  return (
    <div>
      {/* Your React application content */}
    </div>
  );
};

export default DailyQuoteNotification;
