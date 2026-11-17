# Diagrama de classes — ToAqui

O modelo abaixo representa as entidades usadas pela Central operacional. As coleções são armazenadas no navegador para fins de demonstração.

```mermaid
classDiagram
  class Responsavel {
    +string id
    +string nome
    +string telefone
    +string email
  }
  class Aluno {
    +string id
    +string nome
    +string escola
    +string turma
    +string responsavelId
  }
  class Motorista {
    +string id
    +string nome
    +string telefone
    +string registroCnh
  }
  class Veiculo {
    +string id
    +string placa
    +string modelo
    +number capacidade
  }
  class Viagem {
    +string id
    +string nome
    +date data
    +string horarioSaida
    +string horarioChegada
    +string motoristaId
    +string veiculoId
    +string[] alunoIds
    +TripStatus status
  }
  class Presenca {
    +string alunoId
    +BoardingStatus status
  }
  class TransportDataService {
    +salvarResponsavel()
    +salvarAluno()
    +salvarMotorista()
    +salvarVeiculo()
    +salvarViagem()
    +atualizarPresenca()
    +calcularIndicadores()
  }

  Responsavel "1" --> "0..*" Aluno : acompanha
  Motorista "1" --> "0..*" Viagem : conduz
  Veiculo "1" --> "0..*" Viagem : utilizado em
  Viagem "0..*" --> "1..*" Aluno : transporta
  Viagem "1" *-- "0..*" Presenca : registra
  Aluno "1" --> "0..*" Presenca : possui
  TransportDataService ..> Responsavel : gerencia
  TransportDataService ..> Aluno : gerencia
  TransportDataService ..> Motorista : gerencia
  TransportDataService ..> Veiculo : gerencia
  TransportDataService ..> Viagem : gerencia
```

## Regras de relacionamento

- Cada aluno deve estar associado a um responsável cadastrado.
- Cada viagem deve ter um motorista, um veículo e pelo menos um aluno.
- A quantidade de alunos da viagem não pode superar a capacidade do veículo.
- Uma viagem guarda um status de presença para cada aluno associado.
- Um motorista ou veículo não pode ser alocado a mais de uma viagem em andamento na mesma data.
- O CRUD impede excluir responsáveis, alunos, motoristas e veículos que ainda tenham vínculos ativos no modelo.

Os tipos `TripStatus` e `BoardingStatus`, os campos técnicos e as regras estão definidos em `src/app/operacao/transport-data.ts`.
