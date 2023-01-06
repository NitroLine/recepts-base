import {
    Button,
    FormControl, FormErrorMessage,
    FormLabel,
    Text,
    Input, ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea
} from "@chakra-ui/react";
import {useState} from "react";
import {API_PATH} from "./config";
import {BackendInfo, CreateResults, Receipt} from "./types";

interface FormProps {
    onAdd: (res: CreateResults, newItem: Receipt) => void
    onClose: () => void
}

export function NewReceptForm({onClose, onAdd}: FormProps){
    const [receipt, setRecept] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [nameErr, setNameErr] = useState("");
    const [recErr, setRecErr] = useState("");
    function onDone(){
        if (!name){
            setNameErr("Введите название");
            return;
        }
        if (!receipt){
            setRecErr("Введите рецепт");
            return;
        }
        setRecErr("");
        setNameErr("");
        setIsLoading(true);
        fetch(`${API_PATH}/api/receipts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                name, receipt
            })
        }).then(async (resp) =>{
            setIsLoading(true);
            if (!resp.ok){
                if (resp.json){
                    let data = await resp.json();
                    setError(data.detail)
                    return;
                }
                setError(resp.statusText)
                return;
            }
            const data : CreateResults = await resp.json();
            onAdd(data, {name, receipt, receipt_id: data.created_id});
            onClose();
        }).catch((err) => {
            setIsLoading(true);
            setError(String(err));
        });
    }
    return (
      <>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>Create your account</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                  <Text color={'red'}>
                      {error}
                  </Text>
                  <FormControl isInvalid={!!nameErr}>
                      <FormLabel>Название блюда</FormLabel>
                      <Input value={name} onChange={(t) => setName(t.target.value)}  placeholder='Блины' />
                      <FormErrorMessage>{nameErr}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!recErr} mt={4}>
                      <FormLabel>Как приготовить?</FormLabel>
                      <Textarea  value={receipt} onChange={(t) => setRecept(t.target.value)} placeholder='Напишите пошаговый рецепт' />
                      <FormErrorMessage>{recErr}</FormErrorMessage>
                  </FormControl>
              </ModalBody>
              <ModalFooter>
                  <Button colorScheme='yellow' mr={3} onClick={onDone} isLoading={isLoading}>
                      Добавить
                  </Button>
                  <Button onClick={onClose}>Отмена</Button>
              </ModalFooter>
          </ModalContent>

      </>
    );
}