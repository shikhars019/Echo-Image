import { ChakraProvider } from '@chakra-ui/react'
import { Center, Heading } from "@chakra-ui/react"
import AppCore from './components/AppCore';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Center  bg='purple' w='100%' p={4} color='white'>
          <Heading> EchoImage - An OpenAI API Demo Project </Heading>
        </Center >

        <AppCore />

      </div>
    </ChakraProvider>

  );
}

export default App;
