export function formatFirebaseData(arrayDeDocumentos) {
  return arrayDeDocumentos.map((documento) => {
    return { ...documento.data(), id: documento.id };
  });
}
