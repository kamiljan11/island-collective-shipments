# GLOSSARY — słownik domeny

<!-- Nazwy w kodzie MUSZĄ pochodzić stąd. Nowy termin w diffie = nowy wiersz tutaj. -->

| Termin w kodzie | PL | Znaczenie / reguła biznesowa |
|---|---|---|
| group order / campaign | zamówienie grupowe / kampania | kilku klientów dzieli koszt jednego kontenera/palety; ma `target_slots` (cel) i `current_slots` (obecna liczba); publiczna strona per-kampania pod `/group-orders/$campaignId` |
| `deposit_amount` | depozyt | kwota wpłacana przy dołączeniu do kampanii, zanim kampania osiągnie cel |
| shared pallet | wspólna paleta | intake dla mniejszych, jednorazowych przesyłek łączonych na jednej palecie (alternatywa dla pełnej kampanii kontenerowej) |
| idea board / `ideas` | tablica pomysłów | klienci proponują produkty warte sprowadzenia hurtowo; głosowanie (`votes`), moderacja statusu w `admin.ideas.tsx` |
| `quote_requests` | zgłoszenia wyceny | indywidualne (nie-grupowe) zapytania o zakup+wysyłkę z Europy |
| `unit_price_estimate` | szacowana cena jednostkowa | orientacyjny koszt na sztukę w kampanii, aktualizowany przez admina |
| "full refund if target isn't reached" | pełny zwrot przy nieosiągniętym celu | reguła biznesowa kampanii grupowej — depozyt jest zwracany, jeśli `current_slots` nie osiągnie `target_slots` do `ends_at` |
