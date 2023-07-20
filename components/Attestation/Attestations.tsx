import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Link } from "@mui/material";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import React from "react";
import { DynamicAttestation, TypedAttestation } from "../../lib/types";
import { config } from "../../lib/constants";
import { renderDynamicAttestationData, renderTypedAttestationData, timestampToLocalTimeStr } from "../../lib/utils";
import styles from "./index.module.scss";

interface TypedAttestationsProps {
  typedAttestations: TypedAttestation[];
  dynamicAttestations: DynamicAttestation;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
      <div
          className={styles.attestation__pannel}
          role="tabpanel"
          hidden={value !== index}
          id={`vertical-tabpanel-${index}`}
          aria-labelledby={`vertical-tab-${index}`}
          {...other}
      >
        {value === index && (
            <Box sx={{ p: 3 }}>
              <Typography>{children}</Typography>
            </Box>
        )}
      </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export const Attestations: React.FC<TypedAttestationsProps> = ({
  typedAttestations, dynamicAttestations
}) => {
  const [value, setValue] = React.useState(0);
  const [activeTabTyped, setActiveTypedTab] = React.useState<string | false>("panel-0")
  const [activeTabDynamic, setActiveDynamicTab] = React.useState<string | false>("panel-d-0")

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleTabTyped =
      (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setActiveTypedTab(newExpanded ? panel : false);
      };

  const handleTabDynamic =
      (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setActiveDynamicTab(newExpanded ? panel : false);
      };

  console.log("dynamicAttestations", dynamicAttestations);

  return (
    <div className={styles.attestation__container}>
      <Box
          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', width: "100%" }}
      >
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Типизированные" {...a11yProps(0)} />
          <Tab label="Произвольные" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          {typedAttestations?.map((attestation, idx) => (
              <Accordion expanded={activeTabTyped === `panel-${idx}`} onChange={handleTabTyped(`panel-${idx}`)} key={idx}>
                <AccordionSummary
                    className={styles[`attestation__veRank${attestation.verificationRank}`]}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                  <Typography>
                    {attestation.name} ({
                      attestation.verificationRank === 2
                        ? "Государственная организация"
                        : attestation.verificationRank === 1
                          ? "Частная организация"
                          : "Прочие"
                    })
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <b>Автор аттестации:</b> <Link href={`${config.EXPLORER_ADDRESS}/address/${attestation.attestor}`} target='_blank'>{attestation.attestor}</Link>
                  </Typography>
                  {renderTypedAttestationData(attestation.body)}
                  <Typography>
                    {attestation.expireAt > 0 ? (
                        <b>Истекает: {timestampToLocalTimeStr(attestation.expireAt)}</b>
                    ) : (
                        <b>Бессрочно</b>
                    )}
                  </Typography>
                </AccordionDetails>
              </Accordion>
          ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {
            Object.keys(dynamicAttestations).map((item, idx) => (
                <Accordion key={idx} expanded={activeTabDynamic === `panel-d-${idx}`} onChange={handleTabDynamic(`panel-d-${idx}`)}>
              <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  className={styles[`attestation__veRank${dynamicAttestations[item].verificationRank}`]}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
              >
                <Typography>
                  {item} ({
                    dynamicAttestations[item].verificationRank === 2
                      ? "Государственная организация"
                      : dynamicAttestations[item].verificationRank === 1
                        ? "Частная организация"
                        : "Прочие"
                  })
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <b>Автор аттестации:</b> <Link href={`${config.EXPLORER_ADDRESS}/address/${dynamicAttestations[item].attestor}`} target='_blank'>{dynamicAttestations[item].attestor}</Link>
                </Typography>
                {renderDynamicAttestationData(dynamicAttestations[item].body)}
                <Typography>
                    {dynamicAttestations[item].expireAt > 0 ? (
                        <b>Истекает: {timestampToLocalTimeStr(dynamicAttestations[item].expireAt)}</b>
                    ) : (
                        <b>Бессрочно</b>
                    )}
                  </Typography>
              </AccordionDetails>
            </Accordion>))
          }
        </TabPanel>
      </Box>
    </div>
  );
};

export default Attestations;
