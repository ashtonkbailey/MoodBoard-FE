import { hasErrored, saveJournalEntry } from '../actions';

export const patchJournalEntry = (url, entry_text) => {
  return async dispatch => {
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          journal_entry: { entry_text }
        })
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }

      const journal_entry = await response.json();

      dispatch(saveJournalEntry(journal_entry.data.attributes));
    } catch (error) {
      dispatch(hasErrored(error.message));
    }
  };
};
