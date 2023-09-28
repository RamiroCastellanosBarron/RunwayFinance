# Proyecto de Prácticas Profesionales Dirigidas PPD

## Equipo

- Ramiro Castellanos Barrón
- Hernán Patricio González Aguilera

## Beneficiario

Dr. Martin Lozano

## Nombre del proyecto

Riesgo de crédito de empresas públicas

# Code helpers

## Add new migration

```
/c/Projects/RunwayFinance

dotnet ef migrations add InitialCreate -p Infrastructure -s API -c DataContext -o Data/Migrations
```

## Compose docker container

-d = detach

```
docker compose up -d
```

## Remove docker container

```
docker compose down
```
