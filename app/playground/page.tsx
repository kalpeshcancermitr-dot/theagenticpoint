import type { Metadata } from 'next';
import PlaygroundContent from './PlaygroundContent';

export const metadata: Metadata = {
  title: 'AI Playground — Live Demos',
  description:
    'Interact with live AI agent demos built by AgenticPoint — lead qualification, customer support, appointment booking, document processing, and more.',
};

export default function PlaygroundPage() {
  return <PlaygroundContent />;
}
