import React, {memo} from "react";
import RefreshIcon from './../../../assets/imagens/refresh.svg'
import { Card, Typography, Button, Select, MenuItem} from './../../../components'
import COUNTRIES from './../../../commons/constants/countries'
import { CardPanelContentStyled, ItemStyled } from "./style";

const navigatorHasShare = navigator.share

function Panel({updateAt, onChange, data, country, getCoviData}){
    const{cases, recovered, deaths, todayCases, todayDeaths} = data

    const renderCountries = (country, index) => (
        <MenuItem key={`country-${index}`} value={country.value}>
            <ItemStyled>
                <div>{country.label}</div>
                <img src={country.flag} alt={`País-${country.label}`} />
            </ItemStyled>
        </MenuItem>
    )

    const textCovid19 = `País: ${country} - recuperados: ${recovered}`

    const copyInfo = () => {
        navigator.clipborard.writeText(textCovid19)
    }

    const shareInfo = () => {
        navigator.share({
            title: `dados do Covid19 - ${country}`,
            text: textCovid19,
            url: 'https://covid19dio.netlif.app/'
        })
    }

    const renderShareButton = (
        <div>
            <Button variant="contained" color="primary" onClick={shareInfo}>
                Compartilhar
            </Button>
        </div>
    )

    const renderCopyButton =(
        <div>
            <Button variant="contained" color="primary" onClick={copyInfo}>
                Copiar
            </Button>
        </div>
    )

    return (
        <Card>
            <CardPanelContentStyled>
                <div>
                    <Typography variant="h5" component="span" color="primary">Covid19</Typography>
                    <Typography variant="h5" component="span" color="primary">Painel Coronavírus</Typography>
                    <Typography variant="h5" component="span" color="primary">Atualizado em : {updateAt}</Typography>
                    <div className="pt-2">
                        <Select onChange={onChange} value={country}>
                            {COUNTRIES.map(renderCountries)}
                        </Select>
                    </div>
                </div>
                {navigatorHasShare ? renderCopyButton : renderShareButton}
            </CardPanelContentStyled>
        </Card>
    )
}

export default memo(Panel)