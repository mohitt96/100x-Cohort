import { BusinessCard } from './components/BusinessCard';

function App() {
  const interests = ['Coding', 'Sports', 'Movies'];
  const otherSocialMedia = {
    link: 'http://www.example.com',
    label: 'Other account'
  }

  return (
    <>
      <BusinessCard 
        name='Mohit Tulsani'
        description='I am a Software Engineer'
        interests={interests}
        linkedIn='http://www.example.com'
        twitter='http://www.example.com'
        otherSocialMedia={otherSocialMedia}
      />
    </>
  )
}

export default App
