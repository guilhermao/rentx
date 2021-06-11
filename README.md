# Cadastro de carro

** RF **
RF 01. Deve ser possível cadastrar um carro.
RF 02. Deve ser possível listar todas as categorias.

** RN **
RN 01. Não deve ser possível cadastrar um carro com uma placa já existente.
RN 02. Não deve ser possível alterar a placa de um carro já cadastrado.
RN 03. O carro deve ser cadastrado, por padrão, com disponibilidade.
RN 04. O cadastro de carros deve ser realizado apenas por administradores.


# Listagem de carros

** RF **
RF 01. Deve ser possível listar todos os carro disponíveis
RF 02. Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
RF 02. Deve ser possível listar todos os carros disponíveis pelo nome da marca.
RF 02. Deve ser possível listar todos os carros disponíveis pelo nome do carro.

** RN **
RN 01. A listagem deve estar disponível para usuários não logados.


# Cadastro de especificação do carro

** RF **
RF 01. Deve ser possível cadastrar uma especificação para um carro.
RF 02. Deve ser possível listar

** RN **
RN 01. Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
RN 02. Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
RN 03. O cadastro de especificações de carros deve ser realizado apenas por administradores.


# Cadastro de imagens do carro

** RF **
RN 01. Deve ser possível cadastrar imagens para o carro.
RN 02. Deve ser possível listar todos o carros.

** RNF **
RNF 01. O cadastro de imagens do carro deve ser realizado utilizando o multer.
RNF 02. Deve ser possível o envio de até 10 imagens por vez.

** RN **
RF 01. O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
RF 02. O cadastro de imagens de carros deve ser realizado apenas por administradores.


# Aluguel de carro

** RF **
RF 01. Deve ser possível cadastrar um aluguel.

** RN **
RN 01. O aluguel deve ter duração mínima de 24 horas.
RN 02. Não deve ser possível cadastrar um novo aluguel caso já exista um ativo para o mesmo usuário.
RN 03. Não deve ser possível cadastrar um novo aluguel caso já exista um ativo para o mesmo carro.
RN 04. Ao realizar um aluguel o status di carro deverá ser alterado para indisponível.

# Devolução do carros

** RF **
RF 01. Deve ser possível realizar a devoluçãp de um carro

** RN **
RN 01. Se o carro for dovolvido com menos de 24 horas, deverá ser cobrado diária completa.
RN 02. Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
RN 03. Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
RN 04. Ao realizar a devolução, deverá ser calculado o total do aluguel.
RN 05. Caso o horário da devolução seja superior ao horário previsto de entrega, severá ser cobrado multa proporcional aos dias de atraso.
RN 06. Caso haja multa, deverá ser somado ao total do aluguel.