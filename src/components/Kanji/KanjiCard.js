import React from "react";

export const KanjiCard = (props) => {
    return (
        <div className="row align-items-center mb-3 border border-secondary kanji-card">
            <div className="col-12 col-sm-4">
                <div className="bg-secondary h-auto w-50 mx-auto rounded">
                    <h1 className="display-1 text-center py-3 text-light">{props.kanji}</h1>
                </div>
            </div>
            <div className="col-12 col-sm-8">
                <p><b>Spelling: </b> {props.spelling}</p>
                <p><b>Definitions: </b> {props.definitions}</p>
                <p>
                    <b>Strokes: </b>{" "}
                    <span className="badge bg-info rounded-pill">
                        {props.strokes}
                    </span>
                </p>
                <p><b>Example: </b> {props.examples}</p>
            </div>
        </div>
    );
};
