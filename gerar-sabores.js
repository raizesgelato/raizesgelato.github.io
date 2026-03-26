const fs = require('fs');

async function gerarSabores() {
  const response = await fetch('https://app.instadelivery.com.br/api/stores/by-slug/raizesgelato', {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/json, text/plain, */*'
    }
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar API: ${response.status}`);
  }

  const data = await response.json();

  const groups = Array.isArray(data.groups) ? data.groups : [];

  const sabores = groups.flatMap((group) => {
    const items = Array.isArray(group.items) ? group.items : [];

    return items.map((item) => ({
      nome: item.name || 'Sem nome',
      desc: item.description || 'Descrição em breve.',
      imagem: item.image || 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=1000&q=80'
    }));
  });

  const nomes = new Set();

  const saboresUnicos = sabores.filter((item) => {
    const chave = item.nome.trim().toLowerCase();
    if (nomes.has(chave)) return false;
    nomes.add(chave);
    return true;
  });

  fs.writeFileSync('sabores.json', JSON.stringify(saboresUnicos, null, 2), 'utf8');
  console.log('sabores.json gerado com sucesso');
}

gerarSabores().catch((err) => {
  console.error('Erro:', err.message);
});