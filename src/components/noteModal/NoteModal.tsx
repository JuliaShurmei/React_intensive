import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button } from '../button/Button';
import styles from './NoteModal.module.scss';

interface NoteModalProps {
  language: {
    title: string;
    description: string;
    tags: string;
    type: string;
    color: string;
    confirm: string;
    cancel: string;
  };
  note?: {
    title?: string;
    text?: string;
    tags?: string | string[];
    isPublic?: boolean;
    color?: string;
  };
  onConfirm?: (noteData: {
    title: string;
    text: string;
    tags: string[];
    isPublic: boolean;
    color: string;
  }) => void;
  onClose: () => void;
}

export const NoteModal: React.FC<NoteModalProps> = ({ language, note, onConfirm, onClose }) => {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#B0B0B0');

  const handleConfirmClick = () => {
    const tagsArray = typeof tags === 'string' ? tags.split(',').map((tag) => tag.trim()) : [];
    const noteData = {
      title,
      text,
      tags: tagsArray,
      isPublic,
      color,
    };
    if (onConfirm) {
      onConfirm(noteData);
    }
  };

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setText(note.text || '');
      setTags(note.tags !== undefined ? (Array.isArray(note.tags) ? note.tags.join(', ') : note.tags) : '');
      setIsPublic(note.isPublic || false);
      setColor(note.color || '#B0B0B0');
    }
  }, [note]);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleTagsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTags(event.target.value || '');
  };

  const handleIsPublicChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setIsPublic(event.target.value === 'Public');
  };

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  return (
    <div className={styles.modal}>
      <label htmlFor="title">{language.title}:</label>
      <input
        className={styles.inputText}
        placeholder="My title"
        type="text"
        id="title"
        onChange={handleTitleChange}
        value={title}
        required
      />
      <label htmlFor="text">{language.description}:</label>
      <input
        className={styles.inputText}
        type="text"
        placeholder="My description"
        id="description"
        onChange={handleTextChange}
        value={text}
        required
      />

      <label htmlFor="tags">{language.tags}:</label>
      <input
        className={styles.inputText}
        type="text"
        id="tag"
        placeholder="[`tag`]"
        onChange={handleTagsChange}
        value={tags}
        required
      />

      <label>{language.type}:</label>
      <select
        className={styles.inputText}
        onChange={handleIsPublicChange}
        value={isPublic ? 'Public' : 'Private'}>
        <option>Public</option>
        <option>Private</option>
      </select>

      <label htmlFor="color">{language.color}:</label>
      <div style={{ backgroundColor: color }}>
        <input
          className={styles.inputColor}
          placeholder="#B0B0B0"
          type="color"
          id="color"
          onChange={handleColorChange}
          value={color}
          required
        />
      </div>
      {onConfirm && (
        <Button
          className={styles.btnModal}
          onClick={handleConfirmClick}
          localizedValue={language.confirm}
        />
      )}
      <Button className={styles.btnModal} onClick={onClose} localizedValue={language.cancel} />
    </div>
  );
};
