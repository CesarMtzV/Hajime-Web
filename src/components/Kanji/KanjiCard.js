import React from "react";

export const KanjiCard = (props) => {
    return (
        <div className="row align-items-center mb-3 kanji-card">
            <div className="col-12 col-sm-4">
                <div className="h-auto w-50 mx-auto rounded" style={{background: "#CAA9C6"}}>
                    <h1 className="display-1 text-center py-3 text-light">{props.kanji}</h1>
                </div>
            </div>
            <div className="col-12 col-sm-8 d-flex">
                <div className="fs-4 me-5">
                    <p><b>Spelling: </b> <span style={{color: "#b98cb3"}}>{props.spelling}</span></p>
                    <p className="mx-auto"><b>Definitions: </b> <span style={{color: "#b98cb3"}}>{props.definitions}</span></p>
                </div>
                <div className="fs-4 me-5">
                    <p>
                        <b>Strokes: </b>
                        <span className="badge rounded-pill" style={{background: "#b98cb3"}}>
                            {props.strokes}
                        </span>
                    </p>
                    <p><b>Example: </b> <span style={{color: "#b98cb3"}}>{props.examples}</span></p>
                </div>
            </div>
        </div>
    );
};
