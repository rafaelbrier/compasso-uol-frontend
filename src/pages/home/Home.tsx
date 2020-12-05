import { ReactComponent as SearchIcon } from "bootstrap-icons/icons/search.svg";
import Button from "components/button/Button";
import InputText from "components/input-text/InputText";
import * as React from "react";
import IMAGES_PATH from "utils/images-path";
import CardPesquisa from "./components/card-pesquisa/CardPesquisa";

export interface HomeProps {}
const Home: React.FC<HomeProps> = () => {
    return (
        <div className="m-5">
            <CardPesquisa
                imageSrc={IMAGES_PATH.GITHUB_LOGO}
                centerX
                header="Pesquisar usuário Git"
            >
                <div className="mt-3">
                    <InputText
                        name="pesquisa"
                        label="Nome do usuário"
                        placeholder="Ex.: rafaelbrier"
                        endButton={
                            <Button
                                className="btn btn-outline-info"
                                text="Pesquisar"
                                endIcon={<SearchIcon />}
                            />
                        }
                    />
                </div>
            </CardPesquisa>
        </div>
    );
};

export default Home;
