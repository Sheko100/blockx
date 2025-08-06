import { createActor, canisterId } from '../../declarations/blockx_backend';
import { useState } from 'react'

export default function Greeting() {

  const [ greeting, setGreeting ] = useState('');

  async function getGreeting() {

    const backend = createActor(canisterId);
    
    const greeting = await backend.hello();

    const hash = await backend.hash_file(`Hello ${greeting}!`);

    setGreeting(hash);
  }

  getGreeting();

  return (
    <>
	  { greeting }
    </>
  );
}
