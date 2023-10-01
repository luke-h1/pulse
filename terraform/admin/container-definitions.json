[
    {
      "name": "admin",
      "image": "${image_location}",
      "essential": true,
      "memoryReservation": 256,
      "environment": [
        {
          "name": "PUBLIC_URL",
          "value": "${public_url}"
        },
        {
          "name": "PUBLIC_PULSE_API_URL",
          "value": "${public_pulse_api_url}"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "${aws_log_group}",
          "awslogs-region": "${aws_region}",
          "awslogs-stream-prefix": "admin"
        }
      },
      "portMappings": [
        {
          "containerPort": 4000,
          "hostPort": 4000
        }
      ]
    }
  ]
  