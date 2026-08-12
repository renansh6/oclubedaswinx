import { useEffect } from "react";

/**
 * Dificulta a inspeção da página: bloqueia menu de contexto (botão direito),
 * atalhos de devtools/visualizar código e seleção/arrasto de conteúdo.
 * Obs.: é um dissuasor — nenhum site consegue impedir 100% a inspeção.
 */
export function DevtoolsGuard() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => e.preventDefault();

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key?.toLowerCase();
      const blocked =
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c", "k"].includes(key)) ||
        (e.metaKey && e.altKey && ["i", "j", "c", "k"].includes(key)) ||
        ((e.ctrlKey || e.metaKey) && ["u", "s"].includes(key));

      if (blocked) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onDragStart = (e: DragEvent) => e.preventDefault();

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("dragstart", onDragStart);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return null;
}
