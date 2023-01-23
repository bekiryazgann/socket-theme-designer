<?php

$response = [
    'error' => 'Bilinmeyen Hata!!'
];

$data = json_decode(file_get_contents(__DIR__ . '/data.json'), true);

if(isset($_GET['component'])){
    if (isset($data[$_GET['component']])){
        $comp = $data[$_GET['component']];
        $response = [
            'source' => [
                'html' => $comp['html'],
                'css' => $comp['css'],
                'js' => $comp['js']
            ],
            'error' => 'component bulundu'
        ];
    } else {
        $response = [
            'error' => 'böyle bir component bulunamadı',
            'data' => $data
        ];
    }
} else {
    $response = [
        'error' => 'component parametresi eksik'
    ];
}

Header('Content-Type: application/json');
print_r(json_encode($response));