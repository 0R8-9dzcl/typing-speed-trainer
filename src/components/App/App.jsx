import { useEffect, useState } from 'react'
import './App.css'
import TypingContainer from '../TypingContainer/TypingContainer'

const testStrings = [
  'в четверг четвертого числа в четыре с четвертью часа четыре черненьких чертенка чертили черными чернилами чертеж чрезвычайно чисто',
  'шла саша по шоссе и сосала сушку и при этом саша не заметила что на шоссе лежала сушка и теперь саша ищет другую сушку',
  'у кузнеца кузьмы три кузницы а кузница кузнеца кузьмы кузнеца кузьмы кузнеца кузнец кузьма',
  'степан степанович сестры степаниды симпатизировал симпатии степаниды не скрывал однако симпатия степаниды симпатию степан степановичу не проявляла',
  'варвара варавара варит варенье воровала варвара варенье варить ворованное варенье варвара варвара не будет',
  'шла маша по шоссе саша маше шепчет саша шапку на шоссе не теряй маша отвечает на шоссе шапку не теряла',
  'петя петушок перепел перепела перепелок и перепел перепела петя петушок перепелок перепел перепела перепела',
  'торопится перепел перепела перепелок к перепелам перепела перепелку перепелиная перепелка перепел перепелку',
  'столяры строгали столешницы столешницы не строгали столяры строили столы столы строили столешницы столешницы строили столяры',
]

function App() {
  const [correctString, setCorrectString] = useState('')
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * testStrings.length)
    setCorrectString(testStrings[randomNumber])
  }, [])
  return (
    <>
      <header className="header">
        <h1 className="header__title">Typing Speed Trainer</h1>
      </header>
      <main>
        <TypingContainer correctString={correctString} />
      </main>
    </>
  )
}

export default App
