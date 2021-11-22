import React, { useState } from 'react';
import { Api } from '../../Api/Api';
import {toast } from 'react-toastify';
import Button from '../../components/Button/Button';

function CreateTeam() {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const team = e.target.team.value;

        const payload = {
            team,
        };

        const response = await Api.buildApiPostRequest(
            Api.readAllTeams,
            payload,
            true,
        );
            
        const body = await response.json();
            
        if (response.status === 201) {
            toast.success('Time cadastrado com sucesso!', {theme: "dark",position: toast.POSITION.TOP_CENTER,
        });
        }
        
        console.log(payload)
        console.log(team)
        console.log(response)
    }

    return (
        <div>
            <form className="team_form" >
                <div className="team_form_input">
                    <input id="team" type="text" placeholder="Nome do time" name="team" />
                </div>

                <div className="team_button">
                    <Button onClick={handleSubmit} type="submit">Criar</Button>
                </div>
            </form>
        </div>
    )
}

export default CreateTeam
