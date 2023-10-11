export type Testing = {
    readonly "input": Testing$input;
    readonly "result": Testing$result | undefined;
};

export type Testing$result = {
    readonly testingConnexion: string;
};

export type Testing$input = null;

export type Testing$artifact = {
    "name": "Testing";
    "kind": "HoudiniQuery";
    "hash": "4f6b90606e9a69f1e75287fda5acb2db3483ffb01ca06d2063215452cd1a3947";
    "raw": `query Testing {
  testingConnexion
}
`;
    "rootType": "Query";
    "selection": {
        "fields": {
            "testingConnexion": {
                "type": "String";
                "keyRaw": "testingConnexion";
                "visible": true;
            };
        };
    };
    "pluginData": {
        "houdini-svelte": {};
    };
    "policy": "CacheOrNetwork";
    "partial": false;
};