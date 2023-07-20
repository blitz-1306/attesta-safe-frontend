import { Alert, Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { Attestator } from "../../contracts/types";
import { DynamicAttestation, TypedAttestation } from "../../lib/types";
import {
  getUserDynamicAttestations,
  getUserTypedAttestations,
} from "../../lib/utils";
import Attestations from "../Attestation/Attestations";
import styles from "./index.module.scss";

interface SearchProps {
  attestator: Attestator;
}

export const Index: React.FC<SearchProps> = ({ attestator }) => {
  const [addressTo, setAddressTo] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [typedAttestations, setTypedAttestations] = useState<
    TypedAttestation[]
  >([]);
  const [emptyResult, setEmptyResult] = useState<boolean>(false);

  const inputChangeHandler = (value: string) => {
    setAddressTo(value);
    setEmptyResult(false);
  }

  const [
    dynamicAttestations,
    setDynamicAttestations,
  ] = useState<DynamicAttestation>({});

  useEffect(() => {
    (async () => {
      setAddressTo(await attestator.signer.getAddress());
    })();
  }, []);

  const handleSearch = async () => {
    try {
      if (!ethers.utils.isAddress(addressTo)) {
        throw new Error("Неверный адрес кошелька Ethereum");
      }

      setSearchActive(true);

      const typed = await getUserTypedAttestations(attestator, addressTo)
      const dynamic =  await getUserDynamicAttestations(attestator, addressTo)

      setTypedAttestations(typed);
      setDynamicAttestations(dynamic);

      console.log("dynamic -->", dynamic)

      if (!typed.length && !Object.keys(dynamic).length) {
        setEmptyResult(true);
      }

      setSearchActive(false);
    } catch (error) {
      console.error("Ошибка при опросе контракта:", (error as Error).message);
    }
  };

  return (
    <div className={styles.search}>
      <Typography variant="h5">Проводник</Typography>

      <div className={styles.search__address}>
        <TextField
          className={ styles.search__input }
          inputProps={{ maxLength: 42 }}
          aria-valuemax={42}
          id="outlined-basic"
          label="Адрес:"
          variant="outlined"
          value={addressTo}
          onChange={(e) => inputChangeHandler(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ width: "200px", padding: '16px 0', marginLeft: '5px' }}
          onClick={handleSearch}
        >
          Поиск
        </Button>
      </div>

      {
        searchActive
          ? (
            <Box
              sx={{ display: "flex", padding: "20px", justifyContent: "center" }}
            >
              <CircularProgress />
            </Box>
          )
          : (
            (Object.keys(dynamicAttestations).length || typedAttestations.length) ? <Attestations
              typedAttestations={typedAttestations}
              dynamicAttestations={dynamicAttestations} /> : ""
          )
      }

      {
        emptyResult
          ? <Alert severity="error">Для указаного адреса ничего не найдено</Alert>
          : ""
      }
    </div>
  );
};

export default Index;
