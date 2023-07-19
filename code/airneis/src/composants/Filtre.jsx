import React, { useState } from 'react';

const Filtre = ({ applyFilter }) => {
    const [prixMin, setPrixMin] = useState("");
    const [prixMax, setPrixMax] = useState("");
    const [materiaux, setMateriaux] = useState({
        bois: false,
        acier: false,
        plastique: false,
        verre: false,
        aluminium: false
    });

    const handleChangePrixMin = (e) => {
        setPrixMin(e.target.value);
    };

    const handleChangePrixMax = (e) => {
        setPrixMax(e.target.value);
    };

    const handleChangeMateriaux = (e) => {
        setMateriaux({ ...materiaux, [e.target.name]: e.target.checked });
    };

    const handleApplyFilter = () => {
        applyFilter({ prixMin, prixMax, materiaux });
    };

    return (
        <div className="filtre">
            <label>
                Prix Min:
                <input type="number" value={prixMin} onChange={handleChangePrixMin} />
            </label>
            <label>
                Prix Max:
                <input type="number" value={prixMax} onChange={handleChangePrixMax} />
            </label>
            <div>
                Matériaux:
                <label>
                    <input type="checkbox" name="bois" checked={materiaux.bois} onChange={handleChangeMateriaux} />
                    Bois
                </label>
                <label>
                    <input type="checkbox" name="acier" checked={materiaux.acier} onChange={handleChangeMateriaux} />
                    Acier
                </label>
                <label>
                    <input type="checkbox" name="plastique" checked={materiaux.plastique} onChange={handleChangeMateriaux} />
                    Plastique
                </label>
                <label>
                    <input type="checkbox" name="verre" checked={materiaux.verre} onChange={handleChangeMateriaux} />
                    Verre
                </label>
                <label>
                    <input type="checkbox" name="aluminium" checked={materiaux.aluminium} onChange={handleChangeMateriaux} />
                    Aluminium
                </label>
            </div>
            <button onClick={handleApplyFilter}>Appliquer les filtres</button>
        </div>
    );
};

export default Filtre;
