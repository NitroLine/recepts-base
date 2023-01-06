import React, {useEffect, useState} from 'react';
import './App.css';
import {Text, Flex, Heading, Wrap, WrapItem, Card, CardHeader, CardBody, Modal, Button} from '@chakra-ui/react';
import {API_PATH} from "./config";
import {BackendInfo, CreateResults, Receipt, ReceiptsListResults} from "./types";
import packageJson from '../package.json';
import {NewReceptForm} from "./NewReceptForm";
import { AddIcon } from '@chakra-ui/icons'
function App() {
  const [error, setError] = useState("");
  const [isOpen, setModalOpen] = useState(false);
  const [receipts, setListReceipts] = useState<ReceiptsListResults>();
  const [backendInfo, setBackendInfo] = useState<BackendInfo>({replica_id: "Unknown", backend_version: "Unknown"});
  useEffect(() => {
      fetch(`${API_PATH}/api/receipts`).then(async (resp) =>{
        if (!resp.ok){
          if (resp.json){
            let data = await resp.json();
            setError(data.detail)
            return;
          }
          setError(resp.statusText)
          return;
        }
        const data : ReceiptsListResults = await resp.json();
        setListReceipts(data);
      }).catch((err) => setError(String(err)));
    fetch(`${API_PATH}/api/info`).then(async (resp) =>{
      if (!resp.ok){
        if (resp.json){
          let data = await resp.json();
          setError(data.detail)
          return;
        }
        setError(resp.statusText)
        return;
      }
      const data : BackendInfo = await resp.json();
      setBackendInfo(data);
    }).catch((err) => setError(String(err)));

  }, []);
  function onClose(){
    setModalOpen(false);
  }
  function onAdd(res: CreateResults, newItem: Receipt){
    setBackendInfo(res);
    /*setListReceipts((prev) => {
      prev?.receipts.push(newItem);
      return prev;
    });*/
  }
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} >
          <NewReceptForm onAdd={onAdd} onClose={onClose}/>
      </Modal>
      <Flex bg={"yellow.300"} p={5} justifyContent={'space-between'}>
      <Heading>
        Рецепты онлайн
      </Heading>
        <Button leftIcon={<AddIcon />} colorScheme='orange' variant='solid' onClick={() => setModalOpen(true)}>
          Новый
        </Button>
    </Flex>
      <Text color={'red'}>
        {error}
      </Text>
      <Wrap minH={"calc(100vh - 140px)"} p={5} spacing='30px' align='center' justify='center'>
        {receipts?.receipts.map((item) => (<WrapItem><Card maxW={'500px'}>
          <CardHeader><Heading size={'md'}>{item.name}</Heading></CardHeader>
          <CardBody whiteSpace={'pre-wrap'}>
            {item.receipt}
          </CardBody>
        </Card></WrapItem>))}
      </Wrap>
      <Flex bg={'yellow.100'} justifyContent={'space-between'} p={5}>
        <Text>
          Версия фронта {packageJson.version}
        </Text>
        <Text>
          Версия бекэнда {backendInfo.backend_version}
        </Text>
        <Text>
          Номер реплики {backendInfo.replica_id}
        </Text>
      </Flex>

    </div>
  );
}

export default App;
