import React from 'react';
import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Platform } from 'react-native';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';
import { X, AlertTriangle as AlertTriangle } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { usePrank } from '../contexts/PrankContext';

interface PrankModalProps {
  visible: boolean;
  onClose: () => void;
}

// Static map of built-in sound files
const BUILT_IN_SOUNDS = {
  'Chuckle.mp3': require('../assets/sounds/laugh/Chuckle.mp3'),
  'Giggle.mp3': require('../assets/sounds/laugh/Giggle.mp3'),
  'Tee-hee.mp3': require('../assets/sounds/laugh/Tee-hee.mp3'),
};

export default function PrankModal({ visible, onClose }: PrankModalProps) {
  const { theme } = useTheme();
  const { translations } = useLanguage();
  const { settings } = usePrank();
  const soundRef = useRef<Audio.Sound | null>(null);

  const playLaughterSound = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      let soundSource;
      if (settings.laughterSound?.startsWith('file://') || settings.laughterSound?.startsWith('content://')) {
        // Custom sound
        soundSource = { uri: settings.laughterSound };
      } else {
        // Built-in sound
        const soundFile = settings.laughterSound || 'Chuckle.mp3';
        const moduleId = BUILT_IN_SOUNDS[soundFile as keyof typeof BUILT_IN_SOUNDS] || BUILT_IN_SOUNDS['Chuckle.mp3'];
        
        if (Platform.OS === 'web') {
          // For web, use Asset.fromModule to get a proper URI
          const asset = Asset.fromModule(moduleId);
          await asset.downloadAsync();
          soundSource = { uri: asset.uri };
        } else {
          // For native, pass the module ID directly
          soundSource = moduleId;
        }
      }

      const { sound } = await Audio.Sound.createAsync(soundSource, {
        isLooping: true,
        volume: 0.8,
      });
      
      soundRef.current = sound;
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing laughter sound:', error);
    }
  };

  const stopLaughterSound = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    } catch (error) {
      console.log('Error stopping laughter sound:', error);
    }
  };

  useEffect(() => {
    if (visible) {
      playLaughterSound();
    } else {
      stopLaughterSound();
    }

    return () => {
      stopLaughterSound();
    };
  }, [visible]);

  const handleClose = () => {
    stopLaughterSound();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
          <TouchableOpacity 
            style={[styles.closeButton, { backgroundColor: theme.colors.background }]}
            onPress={handleClose}
          >
            <X size={20} color={theme.colors.text} />
          </TouchableOpacity>
          
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.warning + '20' }]}>
            <AlertTriangle size={32} color={theme.colors.warning} />
          </View>
          
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {translations.notification}
          </Text>
          
          <Text style={[styles.message, { color: theme.colors.textSecondary }]}>
            {translations.prankDisclaimer}
          </Text>
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={handleClose}
          >
            <Text style={[styles.buttonText, { color: theme.colors.surface }]}>
              {translations.gotIt}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});