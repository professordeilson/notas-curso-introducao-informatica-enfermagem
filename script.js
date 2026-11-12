  // Dados do arquivo Notas_Prova1_Prova2.csv (pautas ENF 1/25 e ENF 2/26)
  const CSV = `Turma;Nº;Matrícula;Aluno(a);Prova 1;Prova 2;Média;Faltas;Situação
ENF 1/25;1;49301;ALAN XAVIER VAILANT DE ANDRADE;;;;;DESISTENTE
ENF 1/25;2;49353;DEJANIRA DE LIMA RIBEIRO DE MORAES;8,5;10;9,25;1;CURSANDO
ENF 1/25;3;492013;GIULIA ALMEIDA DO NASCIMENTO PEREIRA;10;9,25;9,62;1;CURSANDO
ENF 1/25;4;49261;HELLEN CRISTINY PERCILIA CARDOSO;10;10;10;0;CURSANDO
ENF 1/25;5;49307;JANAINA GALVÃO DE OLIVEIRA;;;;;DESISTENTE
ENF 1/25;6;49228;LUYARA VILENA DA SILVA FERNANDES;;;;;DESISTENTE
ENF 1/25;7;49248;MARIA JOSÉ DIAS DA COSTA;10;8;9;2;CURSANDO
ENF 1/25;8;49347;RENATA DA SILVA MARQUES DE OLIVEIRA;8,5;7,5;8;3;CURSANDO
ENF 1/25;9;49308;VANESSA ROSA DA SILVA;8,5;7;7,75;3;CURSANDO
ENF 1/25;10;49249;VERONICA TRAJANO DIAS;10;10;10;0;CURSANDO
ENF 2/26;1;49966;ANA FLÁVIA SILVA PORTELLA;10;10;10;0;CURSANDO
ENF 2/26;2;50190;ANA NERY LAUREDO GOMES DE FREITAS;10;9;9,5;0;CURSANDO
ENF 2/26;3;50270;DIEGO MOTTA GOMES BARING;8;9;8,5;3;CURSANDO
ENF 2/26;4;50326;FABIOLA KALINA BERNARDES DOS SANTOS;10;10;10;0;CURSANDO
ENF 2/26;5;48065;LETICIA DA SILVA PEREIRA;10;10;10;0;CURSANDO
ENF 2/26;6;50186;SABRINA DA SILVA PEREIRA;10;8,5;9,25;0;CURSANDO
ENF 2/26;7;50316;TAINÁ PEREIRA DA SILVA;10;10;10;1;CURSANDO
ENF 2/26;8;50905;GEOVANA DA SILVA JERONIMO;8,5;10;9,25;0;CURSANDO
ENF 2/26;9;51003;IZADORA CRISTINA CARRILHO DOS SANTOS;10;10;10;1;CURSANDO
ENF 2/26;10;50720;JOICE DE OLIVEIRA DA SILVA;8,5;9;8,75;0;CURSANDO
ENF 2/26;11;50960;LUCIENE MARIA SARDINHA;10;8,25;9,12;0;CURSANDO
ENF 2/26;12;50904;VIKTOR HUGO JOSE DE SOUSA;10;8,5;9,25;1;CURSANDO`;

  // Converte o CSV em lista de objetos
  const alunos = CSV.trim().split("\n").slice(1).map(linha => {
    const [turma, num, matricula, nome, p1, p2, media, faltas, situacao] = linha.split(";");
    return { turma, matricula, nome, p1, p2, media, faltas, situacao };
  });

  const form = document.getElementById("formConsulta");
  const campo = document.getElementById("matricula");
  const resultado = document.getElementById("resultado");

  function escapar(txt) {
    const d = document.createElement("div"); d.textContent = txt; return d.innerHTML;
  }
  function valor(v) { return v === "" ? "–" : escapar(v); }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const busca = campo.value.trim();
    const aluno = alunos.find(a => a.matricula === busca);

    if (!aluno) {
      resultado.innerHTML = `<div class="erro">Matrícula <strong>${escapar(busca)}</strong> não encontrada. Verifique e tente novamente.</div>`;
      return;
    }

    const cabecalho = `
        <h2>${escapar(aluno.nome)}</h2>
        <p class="mat">Matrícula: ${escapar(aluno.matricula)} · Turma ${escapar(aluno.turma)}</p>`;

    if (aluno.situacao === "DESISTENTE") {
      resultado.innerHTML = `<div class="aluno">${cabecalho}
        <div class="aviso">Situação: <strong>Desistente</strong> — não há notas lançadas.</div></div>`;
      return;
    }

    const media = parseFloat(aluno.media.replace(",", "."));
    const classe = media >= 7 ? "aprovado" : "atencao";

    resultado.innerHTML = `
      <div class="aluno">${cabecalho}
        <table>
          <thead><tr><th>Avaliação</th><th>Nota</th></tr></thead>
          <tbody>
            <tr><td>Prova 1</td><td class="nota">${valor(aluno.p1)}</td></tr>
            <tr><td>Prova 2</td><td class="nota">${valor(aluno.p2)}</td></tr>
            <tr class="linha-media"><td>Média</td><td class="nota ${classe}">${valor(aluno.media)}</td></tr>
            <tr><td>Faltas</td><td>${valor(aluno.faltas)}</td></tr>
          </tbody>
        </table>
      </div>`;
  });
