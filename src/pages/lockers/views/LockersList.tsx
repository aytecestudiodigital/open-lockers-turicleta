
import React, { useEffect, useState } from "react"
import { db } from "../../../server/firebase"
import { orderBy, query, where } from "firebase/firestore"
import { collection, getDocs } from "firebase/firestore";
import axios from "axios";
import { Button, Spinner, Table } from "flowbite-react";


export const LockersList = () => {
    const [lockers, setLockers] = useState<any[]>([])

    useEffect(() => {
        getData()
    }, [])


    const getData = async () => {
        const arraylockers: any = []
        const q = query(collection(db, "lockers"), where("type", "==", "magnetika-locker"), orderBy("name", "asc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const locker = doc.data()
            locker.id = doc.id
            locker.status = false
            arraylockers.push(locker)
        });
        arraylockers.sort(compararTransmisores)
        setLockers(arraylockers)
    }

    const compararTransmisores = (a: any, b: any) => {
        // Extraer los números del texto
        const numeroA = parseInt(a.name.match(/\d+/)[0]);
        const numeroB = parseInt(b.name.match(/\d+/)[0]);

        // Comparar solo los números
        return numeroA - numeroB;
    }

    const openLocker = (locker: any, index: any) => {
        const defaultLockers = [...lockers]
        defaultLockers[index].status = true
        setLockers(defaultLockers)
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: locker.endpoint_local,
            headers: {
                'Authorization': '7e2a143a3557a857eaaae9d873e5a27a7b0d7ab4'
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                const defaultLockers = [...lockers]
                defaultLockers[index].status = false
                setLockers(defaultLockers)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <div className="text-center text-2xl mt-12">Listado de lockers</div>
            <div className="flex justify-center">
                <div className="mt-8">
                    {
                        lockers.length > 0 ? (
                            <Table className="">
                                <Table.Head>
                                    <Table.HeadCell>Dispositivo</Table.HeadCell>
                                    <Table.HeadCell></Table.HeadCell>
                                    <Table.HeadCell></Table.HeadCell>
                                </Table.Head>
                                <Table.Body>
                                    {
                                        lockers.map((locker, index) => (
                                            <Table.Row key={locker.id}>
                                                <Table.Cell>{locker.name}</Table.Cell>
                                                <Table.Cell><Button onClick={() => openLocker(locker, index)} size="xs">Abrir</Button></Table.Cell>
                                                {
                                                    locker.status && (
                                                        <Table.Cell><Spinner /></Table.Cell>
                                                    )
                                                }
                                            </Table.Row>
                                        ))
                                    }

                                </Table.Body>
                            </Table>
                        ) : (
                            <Spinner />
                        )
                    }

                </div>
            </div>

        </div>

    )
}