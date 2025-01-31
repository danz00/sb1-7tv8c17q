import jsPDF from 'jspdf';
import { Recipe, Category } from '../types';

export async function generateRecipesPDF(recipes: Recipe[], categories: Category[]) {
  const pdf = new jsPDF('p', 'mm', 'a4');
  let currentY = 10;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 10;
  const contentWidth = pageWidth - 2 * margin;

  // Título do documento
  pdf.setFontSize(20);
  pdf.text('Meu Livro de Receitas', pageWidth / 2, currentY, { align: 'center' });
  currentY += 15;

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const category = categories.find(c => c.id === recipe.categoryId);

    if (currentY > pdf.internal.pageSize.getHeight() - 20) {
      pdf.addPage();
      currentY = 10;
    }

    // Nome da receita e categoria
    pdf.setFontSize(16);
    pdf.text(recipe.name, margin, currentY);
    currentY += 7;
    
    pdf.setFontSize(12);
    if (category) {
      pdf.text(`Categoria: ${category.name}`, margin, currentY);
      currentY += 7;
    }

    // Imagem da receita
    try {
      const imgData = await loadImage(recipe.imageUrl);
      const imgHeight = (contentWidth * imgData.height) / imgData.width;
      pdf.addImage(imgData.data, 'JPEG', margin, currentY, contentWidth, imgHeight);
      currentY += imgHeight + 10;
    } catch (error) {
      console.error('Erro ao carregar imagem:', error);
      currentY += 5;
    }

    // Ingredientes
    pdf.setFontSize(14);
    pdf.text('Ingredientes:', margin, currentY);
    currentY += 7;
    pdf.setFontSize(12);
    recipe.ingredients.forEach(ingredient => {
      pdf.text(`• ${ingredient}`, margin + 5, currentY);
      currentY += 6;
    });
    currentY += 5;

    // Modo de Preparo
    if (currentY > pdf.internal.pageSize.getHeight() - 40) {
      pdf.addPage();
      currentY = 10;
    }

    pdf.setFontSize(14);
    pdf.text('Modo de Preparo:', margin, currentY);
    currentY += 7;
    pdf.setFontSize(12);
    recipe.instructions.forEach((instruction, index) => {
      const lines = pdf.splitTextToSize(`${index + 1}. ${instruction}`, contentWidth);
      lines.forEach((line: string) => {
        if (currentY > pdf.internal.pageSize.getHeight() - 20) {
          pdf.addPage();
          currentY = 10;
        }
        pdf.text(line, margin, currentY);
        currentY += 6;
      });
      currentY += 2;
    });

    // Informação Nutricional
    if (currentY > pdf.internal.pageSize.getHeight() - 40) {
      pdf.addPage();
      currentY = 10;
    }

    pdf.setFontSize(14);
    pdf.text('Informação Nutricional:', margin, currentY);
    currentY += 7;
    pdf.setFontSize(12);
    pdf.text(`Calorias: ${recipe.nutritionalInfo.calories}`, margin + 5, currentY);
    currentY += 6;
    pdf.text(`Proteínas: ${recipe.nutritionalInfo.proteins}g`, margin + 5, currentY);
    currentY += 6;
    pdf.text(`Carboidratos: ${recipe.nutritionalInfo.carbs}g`, margin + 5, currentY);
    currentY += 6;
    pdf.text(`Gorduras: ${recipe.nutritionalInfo.fats}g`, margin + 5, currentY);
    currentY += 15;

    // Adiciona uma linha separadora entre receitas
    if (i < recipes.length - 1) {
      pdf.setDrawColor(200);
      pdf.line(margin, currentY - 5, pageWidth - margin, currentY - 5);
      currentY += 10;
    }
  }

  return pdf;
}

async function loadImage(url: string): Promise<{ data: string, width: number, height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        ctx.drawImage(img, 0, 0);
        resolve({
          data: canvas.toDataURL('image/jpeg'),
          width: img.width,
          height: img.height
        });
      } catch (error) {
        reject(error);
      }
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = url;
  });
}